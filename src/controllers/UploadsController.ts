import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

// Uploads directory path
const uploadsDir = path.join(process.cwd(), 'uploads');

export class UploadsController {
  /**
   * Upload single image
   * POST /uploads
   */
  static uploadSingle(req: Request, res: Response): void {
    try {
      console.log('Processing upload request');
      console.log('Request file:', req.file);

      if (!req.file) {
        console.log('No file in request');
        res.status(400).json({
          success: false,
          message:
            'No file uploaded or invalid file type (only jpg, jpeg, png, gif allowed)',
        });
        return;
      }

      const file = req.file as Express.Multer.File;
      console.log('File processed:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
        size: file.size,
      });

      // Multiple response formats to ensure compatibility
      const responseData = {
        filename: file.filename,
        filePath: `/uploads/${file.filename}`,
        url: `/uploads/${file.filename}`,
        path: `/uploads/${file.filename}`,
        fullPath: file.path,
        mimetype: file.mimetype,
        size: file.size,
      };

      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: responseData,
        filePath: `/uploads/${file.filename}`,
        url: `/uploads/${file.filename}`,
        path: `/uploads/${file.filename}`,
      });
    } catch (error: any) {
      console.error('File upload error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to upload file',
        error: error.message,
      });
    }
  }

  /**
   * Upload single video
   * POST /uploads/video
   */
  static uploadVideo(req: Request, res: Response): void {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message:
            'No video uploaded or invalid file type (mp4, mov, webm allowed)',
        });
        return;
      }

      const file = req.file as Express.Multer.File;

      res.status(200).json({
        success: true,
        message: 'Video uploaded successfully',
        filePath: `/uploads/${file.filename}`,
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      });
    } catch (error: any) {
      console.error('Video upload error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to upload video',
        error: error.message,
      });
    }
  }

  /**
   * Upload banner images (desktop and mobile)
   * POST /uploads/banner
   */
  static uploadBanner(req: Request, res: Response): void {
    try {
      console.log('Processing banner upload request');
      console.log('Request files:', req.files);
      console.log('Request body:', req.body);

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files || (!files.bannerImage && !files.mobileBannerImage)) {
        console.log('No files found in request');
        res.status(400).json({
          success: false,
          message: 'At least one banner image is required',
          debug: {
            filesReceived: !!files,
            bannerImageExists: !!(files && files.bannerImage),
            mobileBannerImageExists: !!(files && files.mobileBannerImage),
          },
        });
        return;
      }

      const response: any = {
        success: true,
        message: 'Banner images uploaded successfully',
        data: {},
      };

      if (files.bannerImage && files.bannerImage[0]) {
        const bannerFile = files.bannerImage[0];
        console.log('Banner image processed:', bannerFile.filename);
        response.data.bannerImage = {
          filename: bannerFile.filename,
          url: `/uploads/${bannerFile.filename}`,
          filePath: `/uploads/${bannerFile.filename}`,
          path: `/uploads/${bannerFile.filename}`,
          size: bannerFile.size,
          mimetype: bannerFile.mimetype,
        };
      }

      if (files.mobileBannerImage && files.mobileBannerImage[0]) {
        const mobileFile = files.mobileBannerImage[0];
        console.log('Mobile banner image processed:', mobileFile.filename);
        response.data.mobileBannerImage = {
          filename: mobileFile.filename,
          url: `/uploads/${mobileFile.filename}`,
          filePath: `/uploads/${mobileFile.filename}`,
          path: `/uploads/${mobileFile.filename}`,
          size: mobileFile.size,
          mimetype: mobileFile.mimetype,
        };
      }

      console.log('Sending response:', response);
      res.status(200).json(response);
    } catch (error: any) {
      console.error('Banner upload error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to upload banner images',
        error: error.message,
      });
    }
  }

  /**
   * Upload multiple gallery images
   * POST /uploads/gallery
   */
  static uploadGallery(req: Request, res: Response): void {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        res.status(400).json({ success: false, message: 'No files uploaded' });
        return;
      }

      const uploadedFiles = (req.files as Express.Multer.File[]).map(
        (file) => ({
          filename: file.filename,
          url: `/uploads/${file.filename}`,
          path: file.path,
          size: file.size,
          mimetype: file.mimetype,
        }),
      );

      res.status(200).json({
        success: true,
        message: 'Gallery images uploaded successfully',
        data: uploadedFiles,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  /**
   * List all uploaded images
   * GET /uploads/list
   */
  static async listUploads(req: Request, res: Response): Promise<void> {
    try {
      // Image file extensions to filter
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

      // Read the uploads directory
      const files = await fs.promises.readdir(uploadsDir);

      // Filter only image files and format the response
      const imageFiles = files
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return imageExtensions.includes(ext);
        })
        .map((file) => ({
          filename: file,
          url: `/uploads/${file}`,
        }));

      res.status(200).json({
        success: true,
        message: `Found ${imageFiles.length} image(s) in uploads folder`,
        data: imageFiles,
        total: imageFiles.length,
      });
    } catch (error: any) {
      console.error('Error reading uploads directory:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to read uploads directory',
        error: error.message,
      });
    }
  }

  /**
   * Delete single image by filename
   * DELETE /uploads/:filename
   */
  static async deleteSingle(req: Request, res: Response): Promise<void> {
    try {
      const { filename } = req.params;

      // Security: Prevent directory traversal attacks
      if (
        filename.includes('..') ||
        filename.includes('/') ||
        filename.includes('\\')
      ) {
        res.status(400).json({
          success: false,
          message: 'Invalid filename',
        });
        return;
      }

      // Construct the full file path
      const filePath = path.join(uploadsDir, filename);

      // Check if file exists
      try {
        await fs.promises.access(filePath, fs.constants.F_OK);
      } catch (error) {
        res.status(404).json({
          success: false,
          message: 'File not found',
        });
        return;
      }

      // Delete the file
      await fs.promises.unlink(filePath);

      res.status(200).json({
        success: true,
        message: 'File deleted successfully',
        filename: filename,
      });
    } catch (error: any) {
      console.error('Error deleting file:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete file',
        error: error.message,
      });
    }
  }

  /**
   * Delete multiple images by filenames
   * DELETE /uploads
   */
  static async deleteMultiple(req: Request, res: Response): Promise<void> {
    try {
      const { filenames } = req.body;

      // Validate input
      if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
        res.status(400).json({
          success: false,
          message: 'Please provide an array of filenames to delete',
        });
        return;
      }

      const results = {
        deleted: [] as string[],
        failed: [] as { filename: string; reason: string }[],
      };

      // Process each filename
      for (const filename of filenames) {
        try {
          // Security: Prevent directory traversal attacks
          if (
            filename.includes('..') ||
            filename.includes('/') ||
            filename.includes('\\')
          ) {
            results.failed.push({ filename, reason: 'Invalid filename' });
            continue;
          }

          const filePath = path.join(uploadsDir, filename);

          // Check if file exists
          try {
            await fs.promises.access(filePath, fs.constants.F_OK);
          } catch (error) {
            results.failed.push({ filename, reason: 'File not found' });
            continue;
          }

          // Delete the file
          await fs.promises.unlink(filePath);
          results.deleted.push(filename);
        } catch (error: any) {
          results.failed.push({ filename, reason: error.message });
        }
      }

      res.status(200).json({
        success: true,
        message: `Deleted ${results.deleted.length} file(s)`,
        data: results,
        summary: {
          total: filenames.length,
          deleted: results.deleted.length,
          failed: results.failed.length,
        },
      });
    } catch (error: any) {
      console.error('Error deleting multiple files:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete files',
        error: error.message,
      });
    }
  }
}

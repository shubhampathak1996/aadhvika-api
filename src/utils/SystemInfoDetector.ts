import si from 'systeminformation';

export interface DetailedDeviceInfo {
  // System Information
  manufacturer?: string;
  model?: string;
  version?: string;
  serial?: string;
  uuid?: string;
  sku?: string;

  // Operating System
  platform?: string;
  distro?: string;
  release?: string;
  codename?: string;
  kernel?: string;
  arch?: string;
  hostname?: string;

  // Hardware
  cpu?: {
    manufacturer?: string;
    brand?: string;
    vendor?: string;
    family?: string;
    model?: string;
    stepping?: string;
    revision?: string;
    voltage?: string;
    speed?: number;
    speedMin?: number;
    speedMax?: number;
    cores?: number;
    physicalCores?: number;
    processors?: number;
    socket?: string;
    cache?: {
      l1d?: number;
      l1i?: number;
      l2?: number;
      l3?: number;
    };
  };

  // Memory
  memory?: {
    total?: number;
    free?: number;
    used?: number;
    active?: number;
    available?: number;
    swapTotal?: number;
    swapUsed?: number;
    swapFree?: number;
  };

  // Storage
  diskLayout?: Array<{
    device?: string;
    type?: string;
    name?: string;
    vendor?: string;
    size?: number;
    interfaceType?: string;
    serialNum?: string;
  }>;

  // Network
  networkInterfaces?: Array<{
    iface?: string;
    ifaceName?: string;
    ip4?: string;
    ip6?: string;
    mac?: string;
    internal?: boolean;
    virtual?: boolean;
    operstate?: string;
    type?: string;
    duplex?: string;
    mtu?: number;
    speed?: number;
    dhcp?: boolean;
    dnsSuffix?: string;
    ieee8021xAuth?: string;
    ieee8021xState?: string;
    carrierChanges?: number;
  }>;

  // Graphics
  graphics?: {
    controllers?: Array<{
      vendor?: string;
      model?: string;
      bus?: string;
      vram?: number;
      vramDynamic?: boolean;
    }>;
    displays?: Array<{
      vendor?: string;
      model?: string;
      main?: boolean;
      builtin?: boolean;
      connection?: string;
      sizeX?: number;
      sizeY?: number;
      pixelDepth?: number;
      resolutionX?: number;
      resolutionY?: number;
      currentRefreshRate?: number;
    }>;
  };

  // BIOS
  bios?: {
    vendor?: string;
    version?: string;
    releaseDate?: string;
    revision?: string;
  };

  // Motherboard
  baseboard?: {
    manufacturer?: string;
    model?: string;
    version?: string;
    serial?: string;
    assetTag?: string;
  };

  // Chassis
  chassis?: {
    manufacturer?: string;
    model?: string;
    type?: string;
    version?: string;
    serial?: string;
    assetTag?: string;
    sku?: string;
  };
}

export class SystemInfoDetector {
  /**
   * Get comprehensive system information
   */
  static async getDetailedSystemInfo(): Promise<DetailedDeviceInfo> {
    try {
      const [
        system,
        osInfo,
        cpu,
        mem,
        diskLayout,
        networkInterfaces,
        graphics,
        bios,
        baseboard,
        chassis,
      ] = await Promise.all([
        si.system(),
        si.osInfo(),
        si.cpu(),
        si.mem(),
        si.diskLayout(),
        si.networkInterfaces(),
        si.graphics(),
        si.bios(),
        si.baseboard(),
        si.chassis(),
      ]);

      return {
        // System Information
        manufacturer: system.manufacturer,
        model: system.model,
        version: system.version,
        serial: system.serial,
        uuid: system.uuid,
        sku: system.sku,

        // Operating System
        platform: osInfo.platform,
        distro: osInfo.distro,
        release: osInfo.release,
        codename: osInfo.codename,
        kernel: osInfo.kernel,
        arch: osInfo.arch,
        hostname: osInfo.hostname,

        // Hardware
        cpu: {
          manufacturer: cpu.manufacturer,
          brand: cpu.brand,
          vendor: cpu.vendor,
          family: cpu.family,
          model: cpu.model,
          stepping: cpu.stepping,
          revision: cpu.revision,
          voltage: cpu.voltage,
          speed: cpu.speed,
          speedMin: cpu.speedMin,
          speedMax: cpu.speedMax,
          cores: cpu.cores,
          physicalCores: cpu.physicalCores,
          processors: cpu.processors,
          socket: cpu.socket,
          cache: cpu.cache,
        },

        // Memory
        memory: {
          total: mem.total,
          free: mem.free,
          used: mem.used,
          active: mem.active,
          available: mem.available,
          swapTotal: mem.swaptotal,
          swapUsed: mem.swapused,
          swapFree: mem.swapfree,
        },

        // Storage
        diskLayout,

        // Network
        networkInterfaces: networkInterfaces.map((net) => ({
          iface: net.iface,
          ifaceName: net.ifaceName,
          ip4: net.ip4,
          ip6: net.ip6,
          mac: net.mac,
          internal: net.internal,
          virtual: net.virtual,
          operstate: net.operstate,
          type: net.type,
          duplex: net.duplex,
          mtu: net.mtu || undefined,
          speed: net.speed || undefined,
          dhcp: net.dhcp,
          dnsSuffix: net.dnsSuffix,
          ieee8021xAuth: net.ieee8021xAuth,
          ieee8021xState: net.ieee8021xState,
          carrierChanges: net.carrierChanges || undefined,
        })),

        // Graphics
        graphics: {
          controllers: graphics.controllers?.map((ctrl) => ({
            vendor: ctrl.vendor,
            model: ctrl.model,
            bus: ctrl.bus,
            vram: ctrl.vram || undefined,
            vramDynamic: ctrl.vramDynamic,
          })),
          displays: graphics.displays?.map((display) => ({
            vendor: display.vendor,
            model: display.model,
            main: display.main,
            builtin: display.builtin,
            connection: display.connection || undefined,
            sizeX: display.sizeX || undefined,
            sizeY: display.sizeY || undefined,
            pixelDepth: display.pixelDepth || undefined,
            resolutionX: display.resolutionX || undefined,
            resolutionY: display.resolutionY || undefined,
            currentRefreshRate: display.currentRefreshRate || undefined,
          })),
        },

        // BIOS
        bios,

        // Motherboard
        baseboard,

        // Chassis
        chassis,
      };
    } catch (error) {
      console.error('Error getting detailed system info:', error);
      return {};
    }
  }

  /**
   * Get simplified device information for activation (compatible with existing format)
   */
  static async getSimplifiedDeviceInfo(): Promise<{
    deviceName?: string;
    hostname?: string;
    operatingSystem?: string;
    processor?: string;
    memory?: string;
    diskSpace?: string;
    macAddress?: string;
    manufacturer?: string;
    model?: string;
  }> {
    try {
      const [system, osInfo, cpu, mem, diskLayout, networkInterfaces] =
        await Promise.all([
          si.system(),
          si.osInfo(),
          si.cpu(),
          si.mem(),
          si.diskLayout(),
          si.networkInterfaces(),
        ]);

      // Get primary MAC address (non-internal, non-virtual)
      const primaryNetwork = networkInterfaces.find(
        (net) =>
          !net.internal &&
          !net.virtual &&
          net.mac &&
          net.mac !== '00:00:00:00:00:00'
      );

      // Calculate total disk space
      const totalDiskSpace = diskLayout.reduce(
        (total, disk) => total + (disk.size || 0),
        0
      );
      const diskSpaceGB = Math.round(totalDiskSpace / (1024 * 1024 * 1024));

      // Format memory
      const memoryGB = Math.round((mem.total || 0) / (1024 * 1024 * 1024));

      return {
        deviceName: osInfo.hostname || system.model || 'Unknown Device',
        hostname: osInfo.hostname,
        operatingSystem:
          `${osInfo.distro} ${osInfo.release}` || osInfo.platform,
        processor:
          cpu.brand ||
          `${cpu.manufacturer} ${cpu.model}` ||
          'Unknown Processor',
        memory: `${memoryGB}GB`,
        diskSpace: `${diskSpaceGB}GB`,
        macAddress: primaryNetwork?.mac?.toUpperCase(),
        manufacturer: system.manufacturer,
        model: system.model,
      };
    } catch (error) {
      console.error('Error getting simplified system info:', error);
      return {};
    }
  }

  /**
   * Get all MAC addresses from the system
   */
  static async getAllMacAddresses(): Promise<string[]> {
    try {
      const networkInterfaces = await si.networkInterfaces();
      return networkInterfaces
        .filter((net) => net.mac && net.mac !== '00:00:00:00:00:00')
        .map((net) => net.mac?.toUpperCase())
        .filter(Boolean) as string[];
    } catch (error) {
      console.error('Error getting MAC addresses:', error);
      return [];
    }
  }

  /**
   * Get primary MAC address (first non-internal, non-virtual interface)
   */
  static async getPrimaryMacAddress(): Promise<string | null> {
    try {
      const networkInterfaces = await si.networkInterfaces();
      const primaryNetwork = networkInterfaces.find(
        (net) =>
          !net.internal &&
          !net.virtual &&
          net.mac &&
          net.mac !== '00:00:00:00:00:00'
      );
      return primaryNetwork?.mac?.toUpperCase() || null;
    } catch (error) {
      console.error('Error getting primary MAC address:', error);
      return null;
    }
  }

  /**
   * Get system health/status information
   */
  static async getSystemHealth(): Promise<{
    cpu?: { temperature?: number; load?: number };
    memory?: { usage?: number };
    disks?: Array<{ device?: string; usage?: number; temperature?: number }>;
    battery?: { percent?: number; isCharging?: boolean };
  }> {
    try {
      const [cpuTemp, currentLoad, memLayout, fsSize, battery] =
        await Promise.all([
          si.cpuTemperature().catch(() => ({})),
          si.currentLoad().catch(() => ({})),
          si.memLayout().catch(() => []),
          si.fsSize().catch(() => []),
          si.battery().catch(() => ({})),
        ]);

      const mem = await si.mem().catch(() => ({}));

      return {
        cpu: {
          temperature: 'max' in cpuTemp ? cpuTemp.max : undefined,
          load:
            'currentload' in currentLoad
              ? (currentLoad as any).currentload
              : undefined,
        },
        memory: {
          usage:
            'total' in mem && 'used' in mem && mem.total
              ? (mem.used / mem.total) * 100
              : undefined,
        },
        disks: fsSize.map((disk) => ({
          device: disk.fs,
          usage: disk.size ? ((disk.used || 0) / disk.size) * 100 : undefined,
        })),
        battery: {
          percent: 'percent' in battery ? battery.percent : undefined,
          isCharging: 'isCharging' in battery ? battery.isCharging : undefined,
        },
      };
    } catch (error) {
      console.error('Error getting system health:', error);
      return {};
    }
  }
}

export default SystemInfoDetector;

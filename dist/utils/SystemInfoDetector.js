"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfoDetector = void 0;
const systeminformation_1 = __importDefault(require("systeminformation"));
class SystemInfoDetector {
    /**
     * Get comprehensive system information
     */
    static async getDetailedSystemInfo() {
        try {
            const [system, osInfo, cpu, mem, diskLayout, networkInterfaces, graphics, bios, baseboard, chassis,] = await Promise.all([
                systeminformation_1.default.system(),
                systeminformation_1.default.osInfo(),
                systeminformation_1.default.cpu(),
                systeminformation_1.default.mem(),
                systeminformation_1.default.diskLayout(),
                systeminformation_1.default.networkInterfaces(),
                systeminformation_1.default.graphics(),
                systeminformation_1.default.bios(),
                systeminformation_1.default.baseboard(),
                systeminformation_1.default.chassis(),
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
        }
        catch (error) {
            console.error('Error getting detailed system info:', error);
            return {};
        }
    }
    /**
     * Get simplified device information for activation (compatible with existing format)
     */
    static async getSimplifiedDeviceInfo() {
        try {
            const [system, osInfo, cpu, mem, diskLayout, networkInterfaces] = await Promise.all([
                systeminformation_1.default.system(),
                systeminformation_1.default.osInfo(),
                systeminformation_1.default.cpu(),
                systeminformation_1.default.mem(),
                systeminformation_1.default.diskLayout(),
                systeminformation_1.default.networkInterfaces(),
            ]);
            // Get primary MAC address (non-internal, non-virtual)
            const primaryNetwork = networkInterfaces.find((net) => !net.internal &&
                !net.virtual &&
                net.mac &&
                net.mac !== '00:00:00:00:00:00');
            // Calculate total disk space
            const totalDiskSpace = diskLayout.reduce((total, disk) => total + (disk.size || 0), 0);
            const diskSpaceGB = Math.round(totalDiskSpace / (1024 * 1024 * 1024));
            // Format memory
            const memoryGB = Math.round((mem.total || 0) / (1024 * 1024 * 1024));
            return {
                deviceName: osInfo.hostname || system.model || 'Unknown Device',
                hostname: osInfo.hostname,
                operatingSystem: `${osInfo.distro} ${osInfo.release}` || osInfo.platform,
                processor: cpu.brand ||
                    `${cpu.manufacturer} ${cpu.model}` ||
                    'Unknown Processor',
                memory: `${memoryGB}GB`,
                diskSpace: `${diskSpaceGB}GB`,
                macAddress: primaryNetwork?.mac?.toUpperCase(),
                manufacturer: system.manufacturer,
                model: system.model,
            };
        }
        catch (error) {
            console.error('Error getting simplified system info:', error);
            return {};
        }
    }
    /**
     * Get all MAC addresses from the system
     */
    static async getAllMacAddresses() {
        try {
            const networkInterfaces = await systeminformation_1.default.networkInterfaces();
            return networkInterfaces
                .filter((net) => net.mac && net.mac !== '00:00:00:00:00:00')
                .map((net) => net.mac?.toUpperCase())
                .filter(Boolean);
        }
        catch (error) {
            console.error('Error getting MAC addresses:', error);
            return [];
        }
    }
    /**
     * Get primary MAC address (first non-internal, non-virtual interface)
     */
    static async getPrimaryMacAddress() {
        try {
            const networkInterfaces = await systeminformation_1.default.networkInterfaces();
            const primaryNetwork = networkInterfaces.find((net) => !net.internal &&
                !net.virtual &&
                net.mac &&
                net.mac !== '00:00:00:00:00:00');
            return primaryNetwork?.mac?.toUpperCase() || null;
        }
        catch (error) {
            console.error('Error getting primary MAC address:', error);
            return null;
        }
    }
    /**
     * Get system health/status information
     */
    static async getSystemHealth() {
        try {
            const [cpuTemp, currentLoad, memLayout, fsSize, battery] = await Promise.all([
                systeminformation_1.default.cpuTemperature().catch(() => ({})),
                systeminformation_1.default.currentLoad().catch(() => ({})),
                systeminformation_1.default.memLayout().catch(() => []),
                systeminformation_1.default.fsSize().catch(() => []),
                systeminformation_1.default.battery().catch(() => ({})),
            ]);
            const mem = await systeminformation_1.default.mem().catch(() => ({}));
            return {
                cpu: {
                    temperature: 'max' in cpuTemp ? cpuTemp.max : undefined,
                    load: 'currentload' in currentLoad
                        ? currentLoad.currentload
                        : undefined,
                },
                memory: {
                    usage: 'total' in mem && 'used' in mem && mem.total
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
        }
        catch (error) {
            console.error('Error getting system health:', error);
            return {};
        }
    }
}
exports.SystemInfoDetector = SystemInfoDetector;
exports.default = SystemInfoDetector;

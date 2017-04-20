export class SPUtils {
    public static GetTenantNameFromUrl(url: string) : string {
        let start: number = "https://".length;
        let end: number = url.indexOf(".");
        let tenantName = url.slice(start,end);
        return tenantName;
    }
}
import { HttpHeaders } from "@angular/common/http";

// Décorateur pour ajouter un en-tête "authorization" si un token est disponible
export function needToken(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        
        const instance = this as any;
        if (!instance?.token) {
            throw new Error("Token is not defined in the instance.");
        }

        const headers = new HttpHeaders().set("authorization", `${instance?.token}`);
        const options = { headers };
        return originalMethod.apply(this, [...args, options]);
    };

    return descriptor;
}
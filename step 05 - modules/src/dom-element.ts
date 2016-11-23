export default function DOMElement(value: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oldMethod = target[propertyKey];
        descriptor.value = function (...args: any[]) {
            return `<${value}>${oldMethod.apply(this, args)}</${value}>`;
        }
        return descriptor;
    }
}

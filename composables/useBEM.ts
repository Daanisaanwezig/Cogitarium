class BEMClass {
    private componentName: string = ''

    constructor(name: string) {
        this.componentName = name
    }

    childClass(className: string) {
        return `${this.componentName}__${className}`
    }
    modifierClass(className: string) {
        return `${this.componentName}--${className}`
    }
}

export function useBEM(name: string) {
    return new BEMClass(name)
}
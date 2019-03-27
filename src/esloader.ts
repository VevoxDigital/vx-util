
interface IResolverValue {
    url: string,
    format: string
}

export async function resolve (specifier: string, parentModuleURL: string,
                               defaultResolver: Functional.Operator<[string, string], IResolverValue>
                               ): Promise<IResolverValue> {
    const resolved = defaultResolver!(specifier, parentModuleURL)
    const { url } = resolved

    if (resolved.format === 'cjs' && url.endsWith('.js')) {
        return { url, format: 'esm' }
    }
    return resolved
}

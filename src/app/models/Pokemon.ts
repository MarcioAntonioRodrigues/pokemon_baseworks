export interface IPokemon {
    id: string | null;
    name: string | null;
    types: Array<IPokemonType> | null;
    height: string | null;
    weight: string | null;
    urlImage: string | null;
    abilities: Array<IAbility> | null;
    stats: Array<IPokemonStats> | null;
}

export interface IPokemonStats {
    base_stat: number,
    effort: number,
    stat: IStats;
}

export interface IStats {
    name: string;
    url: string;
}

export interface IAbility {
    ability: any;
}

export interface IPokemonType {
    type: any;
}
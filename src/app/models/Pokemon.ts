export interface IPokemon {
    name: string | null;
    urlImage: string | null;
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
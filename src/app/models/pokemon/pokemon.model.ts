export class Pokemon {
    name: string;
    image: PokemonImage;
    id: string;
    types: string[] = [];
    resistances: Resistances[] = [];
    weaknesses: Weaks[] = [];
    attacks: Attacks[] = [];

    constructor(init?: Partial<Pokemon>) {
        Object.keys(init).forEach(key => {
            if (!init[key] || init[key] == null || init[key] == '') {
                delete init[key];
            }
        })
        Object.assign(this, init);
    }
}

export class PokemonFilter {
    q: string;
    page: number = 1;
    pageSize: number = 16;
    orderBy: string = 'name';

    constructor(init?: Partial<PokemonFilter>) {
        Object.assign(this, init);
    }
}

export class PokemonByIdResponse {
    data: PokemonResponse;


    constructor(init?: Partial<PokemonByIdResponse>) {
        Object.assign(this, init);
    }
}

export class PokemonResponse {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    level: string;
    hp: string;
    types: string[];
    evolvesFrom: string[];
    abilities: Abilities[];
    attacks: Attacks[];
    weaknesses: Weaks[];
    resistances: Resistances[];
    retreatCost: string[];
    convertedRetreatCost: number;
    set: Set;
    number: number;
    artist: string;
    rarity: string;
    nationalPokedexNumbers: number[];
    legalities: Legality;
    images: PokemonImage;
    tcgplayer: TgcPlayer;

    constructor(init?: Partial<PokemonResponse>) {
        Object.assign(this, init);
    }
}

export class Abilities {
    name: string;
    text: string;
    type: string;
    constructor(init?: Partial<Abilities>) {
        Object.assign(this, init);
    }
}

export class Attacks {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
    constructor(init?: Partial<Attacks>) {
        Object.assign(this, init);
    }
}

export class Weaks {
    type: string;
    value: string;

    constructor(init?: Partial<Weaks>) {
        Object.assign(this, init);
    }
}


export class Resistances {
    type: string;
    value: string;

    constructor(init?: Partial<Resistances>) {
        Object.assign(this, init);
    }
}

export class Set {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legality;
    ptcgoCode: string;
    releaseDate: Date;
    updatedAt: Date;
    images: {
        "symbol": "https://images.pokemontcg.io/pl1/symbol.png",
        "logo": "https://images.pokemontcg.io/pl1/logo.png"
    }

    constructor(init?: Partial<Set>) {
        Object.assign(this, init);
    }
}

export class Legality {
    inlimited: string;

    constructor(init?: Partial<Legality>) {
        Object.assign(this, init);
    }
}

export class Image {
    symbol: string;
    logo: string

    constructor(init?: Partial<Image>) {
        Object.assign(this, init);
    }
}

export class PokemonImage {
    small: string;
    large: string

    constructor(init?: Partial<PokemonImage>) {
        Object.assign(this, init);
    }
}

export class TgcPlayer {
    url: string;
    updatedAt: Date;
    prices: Prices;

    constructor(init?: Partial<TgcPlayer>) {
        Object.assign(this, init);
    }
}

export class Prices {
    holofoil: Holofoil;
    reverseHolofoil: ReverseHolofoil;

    constructor(init?: Partial<Prices>) {
        Object.assign(this, init);
    }
}

export class Holofoil {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow?: number;

    constructor(init?: Partial<Holofoil>) {
        Object.assign(this, init);
    }
}

export class ReverseHolofoil {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow?: number;

    constructor(init?: Partial<ReverseHolofoil>) {
        Object.assign(this, init);
    }
}

export class PokemonResponseList {
    data: PokemonResponse[];
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;

    constructor(init?: Partial<PokemonResponseList>) {
        Object.assign(this, init);
    }
}
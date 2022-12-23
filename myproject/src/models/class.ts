class Test {
    private _id: number;
    private _nom: string;
    constructor(id: number , nom: string){
        this._id = id;
        this._nom = nom;
    }

    get id(): number {
        return this._id
    }
    get nom(): string {
        return this._nom
    }

    set id(id: number){
        this._id = id;
        
    }
    set nom(nom: string){
        this._nom = nom;

    }
}

const wassim: Test = new Test(1, "wassim");
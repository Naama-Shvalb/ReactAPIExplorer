export class User{
    name: string;
    email: string;
    scores: [];
    averageScore: number;
    constructor(name, email, scores){
        this.name = name;
        this.email = email;
        this.scores = scores || [];
        this.averageScore = 0;
    }
}

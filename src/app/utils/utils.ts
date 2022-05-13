export class Utils {

    static compareById(a: any, b: any):boolean {
        return a && b && a.id === b.id;
    }

    static compareHorario(a: any, b: any):boolean {
        return a && b;
    }

}

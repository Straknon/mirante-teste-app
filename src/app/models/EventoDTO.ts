export class EventoDTO {
    public id?: number;
    public titulo: string = '';
    public descricao: string = '';
    public local: string= '';
    public createdAt: number = Date.now();
    public updatedAt:  number = Date.now();
    public deleted: boolean = false;
}
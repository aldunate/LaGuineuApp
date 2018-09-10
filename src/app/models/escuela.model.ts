export class Escuela {
  public Id: number;
  public Nombre: string;
  public Direccion: string;
  public FotoPerfil: string;
  public Telefono: string;
  public Email: string;
}

export class EscuelaModel {
  public Escuela: Escuela = new Escuela();
  public FechasDisponibles: any[] = [];
  public EstacionesDisponibles: any[] = [];
  public DeportesDisponibles: any = [];
  public Operacion: string;
  constructor() {

  }
}

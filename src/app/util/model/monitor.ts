export class Monitor {
  public Id: number;
  public Nombre: string;
  public Apellidos: string;
  public FechaNacimiento: any;
  public FotoPerfil: string;
  public FechaCrea: any;
  public FechaElim: any;
  public IdUsuario: number;
  public IdEscuela: number;

  constructor() {
    this.Nombre = '';
    this.Apellidos = '';
    this.FechaNacimiento = '';
    this.FotoPerfil = '';
  }
}

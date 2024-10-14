
export class Parameters {
  // Metodo static es un metodo que puede ser accedido sin necesidad de instanciar la clase
  static readonly DB_NAME = process.env.DB_NAME || "test";
    static readonly DB_PORT = process.env.DB_PORT || "3025";
    static readonly DB_HOST = process.env.DB_HOST || "test";
}

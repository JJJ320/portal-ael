export type Cargo = "aluno" | "lider" | "funcionario";

export function setUserCargo(cargo: Cargo) {
  localStorage.setItem("cargo", cargo);
}

export function getUserCargo(): Cargo | null {
  return localStorage.getItem("cargo") as Cargo | null;
}

export function clearUser() {
  localStorage.removeItem("cargo");
}
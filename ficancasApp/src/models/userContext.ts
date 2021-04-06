export interface UserContext {
  id?: string;
  nome?: string;
  email?: string | any;
  signed?: boolean;
  isLoading?: boolean;
  loadingAuth?: boolean;
  singUp(email: string, password: string, nome: string): void;
  signIn(email: string, password: string): void;
  signOut(): void;
}
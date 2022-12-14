interface Default {
  extends: string;
  compilerOptions: CompilerOptions;
}
interface CompilerOptions {
  noEmit: boolean;
  declaration: boolean;
}
export default Default;
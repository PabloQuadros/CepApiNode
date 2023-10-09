export class PasswordHashing {
    static hashPassword(password: string): string {
      let hashedPassword = '';
  
      for (let i = 0; i < password.length; i++) {
        const currentChar = password[i];
        const previousChar = i > 0 ? password[i - 1] : '\0';
  
        const asciiValue = currentChar.charCodeAt(0) * previousChar.charCodeAt(0);
  
        hashedPassword += asciiValue.toString(16); // Adiciona o valor resultante em hexadecimal à string resultante.
      }
  
      return hashedPassword;
    }
  
    static verifyPassword(hashedPassword: string, passwordToVerify: string): boolean {
      const hashedInput = this.hashPassword(passwordToVerify);
      return hashedPassword === hashedInput;
    }
  }
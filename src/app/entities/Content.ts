export class Content {
  private readonly content: string;

  validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);
    if (!isContentLengthValid) {
      throw new Error('content Length error');
    }
    this.content = content;
  }

  get value(): string {
    return this.content;
  }
}

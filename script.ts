// Базовий інтерфейс для всього контенту
interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
  }
  
  // розширити для різних типів контенту
  interface Article extends BaseContent {
    title: string;
    content: string;
    authorId: string;
    tags?: string[];
  }
  
 
  interface Product extends BaseContent {
    name: string;
    description: string;
    price: number;
    stock: number;
  }
  
  // Створіть generic тип для операцій з контентом
  type ContentOperations<T extends BaseContent> = {
    create: (content: T) => Promise<T>;
    read: (id: string) => Promise<T | null>;
    update: (id: string, content: Partial<T>) => Promise<T | null>;
    delete: (id: string) => Promise<boolean>;
  }
  
  // Визначаємо базові ролі та права
  type Role = 'admin' | 'editor' | 'viewer';
  
  type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  }
  

  type ValidationError = {
    code: string;
    message: string;
  }
  
  // Базовий тип для валідатора
  type Validator<T> = {
    validate: (data: T) => ValidationResult<T>;
  }
  
  type ValidationResult<T> = {
    isValid: boolean;
    errors?: ValidationError[];
  }
  
  
  type AccessControl<T extends BaseContent> = {
    role: Role;
    permissions: Permission;
    canAccess: (content: T, action: keyof Permission) => boolean;
  }
  
  
  class ContentValidator<T extends BaseContent> implements Validator<T> {
    validate(data: T): ValidationResult<T> {
      const errors: ValidationError[] = [];
      
      return {
        isValid: errors.length === 0,
        errors: errors.length ? errors : undefined,
      };
    }
  }
  
 
  const articleValidator = new ContentValidator<Article>();
  const productValidator = new ContentValidator<Product>();
  
 
  type Versioned<T extends BaseContent> = {
    content: T;
    version: number;
    history: Array<{ version: number; updatedAt: Date; }>;
    rollback: (version: number) => T | null;
  }
  
   // Тест
   const article: Article = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    title: 'Заголовок',
    content: 'Шось написав.',   
    authorId: 'Koristuvach',
    tags: ['новини', 'стаття'],
  };
  
 
  const articleValidationResult = articleValidator.validate(article);
  
  if (articleValidationResult.isValid) {
    console.log('Стаття валідна:', article);
  } else {
    console.error('Помилки валідації:', articleValidationResult.errors);
  }
  
  // доступ
  const accessControl: AccessControl<Article> = {
    role: 'editor',
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    canAccess: (content, action) => {
      // все, крім видалення
      return action !== 'delete'; 
    }
  };
  
  // Перевірка доступу
  if (accessControl.canAccess(article, 'read')) {
    console.log('Користувач може читати статтю.');
  }
  
  if (accessControl.canAccess(article, 'delete')) {
    console.log('Користувач може видалити статтю.');
  } else {
    console.log('Користувач не може видалити статтю.');
  }

  
 
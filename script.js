"use strict";
class ContentValidator {
    validate(data) {
        const errors = [];
        return {
            isValid: errors.length === 0,
            errors: errors.length ? errors : undefined,
        };
    }
}
const articleValidator = new ContentValidator();
const productValidator = new ContentValidator();
// Тест
const article = {
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
}
else {
    console.error('Помилки валідації:', articleValidationResult.errors);
}
// доступ
const accessControl = {
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
}
else {
    console.log('Користувач не може видалити статтю.');
}

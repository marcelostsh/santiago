/**
 * Exportação centralizada dos serviços de dados.
 * Isto facilita importar múltiplas funções com uma única importação.
 */

// Reexportar todas as funções do dataService
export * from './dataService';

// Exportar a configuração
export { isUsingFirebase } from './config'; 
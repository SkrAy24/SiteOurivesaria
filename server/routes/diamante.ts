import { Router, Request, Response } from 'express';
import { diamanteService } from '../services/diamante-integration';
import { storage } from '../storage';

const router = Router();

/**
 * Rota para testar a conexão com o Diamante
 */
router.get('/status', async (req: Request, res: Response) => {
  if (!diamanteService.isConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'API do Diamante não está configurada. Verifique as variáveis de ambiente.',
    });
  }

  try {
    const isConnected = await diamanteService.testConnection();
    
    if (isConnected) {
      return res.status(200).json({
        success: true,
        message: 'Conexão com o Diamante estabelecida com sucesso',
      });
    } else {
      return res.status(503).json({
        success: false,
        message: 'Não foi possível conectar ao Diamante',
      });
    }
  } catch (error) {
    console.error('Erro ao testar conexão com o Diamante:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao testar conexão com o Diamante',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

/**
 * Rota para gerar uma fatura no Diamante para um pedido existente
 */
router.post('/invoice/:orderId', async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      success: false, 
      message: 'Autenticação necessária' 
    });
  }

  if (!diamanteService.isConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'API do Diamante não está configurada',
    });
  }

  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    return res.status(400).json({
      success: false,
      message: 'ID do pedido inválido',
    });
  }

  try {
    // Buscar o pedido completo
    const order = await storage.getOrder(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado',
      });
    }

    // Verificar se o pedido é do usuário autenticado
    // Na implementação completa, verificaríamos se é admin também
    if (order.userId !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado a este pedido',
      });
    }

    // Verificar se já existe uma fatura
    if (order.diamanteInvoiceId) {
      return res.status(400).json({
        success: false,
        message: 'Este pedido já possui uma fatura no Diamante',
      });
    }

    // Buscar itens do pedido
    const orderItems = await storage.getOrderItems(orderId);
    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Itens do pedido não encontrados',
      });
    }

    // Buscar dados dos produtos
    const productIds = orderItems.map(item => item.productId);
    const productPromises = productIds
      .filter((id): id is number => id !== null) // Garantir que só IDs não-nulos sejam processados
      .map(id => storage.getProduct(id));
      
    const products = await Promise.all(productPromises);
    const validProducts = products.filter((p): p is NonNullable<typeof p> => p !== undefined);

    // Buscar dados do usuário
    if (order.userId === null) {
      return res.status(404).json({
        success: false,
        message: 'ID de usuário não encontrado no pedido',
      });
    }
    
    const user = await storage.getUser(order.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // Criar a fatura no Diamante
    const invoiceResponse = await diamanteService.createInvoice(
      order,
      user,
      orderItems,
      validProducts
    );

    if (invoiceResponse.success) {
      // Atualizar o pedido com os dados da fatura
      await storage.updateOrderStatus(orderId, {
        status: 'invoiced',
        diamanteInvoiceId: invoiceResponse.invoiceNumber || null,
        diamanteInvoiceUrl: invoiceResponse.invoiceUrl || null
      });
      
      // Atualizar inventário no Diamante
      await diamanteService.syncInventory(orderItems);

      return res.status(200).json({
        success: true,
        message: 'Fatura gerada com sucesso',
        invoiceNumber: invoiceResponse.invoiceNumber,
        invoiceUrl: invoiceResponse.invoiceUrl,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Erro ao gerar fatura no Diamante',
        error: invoiceResponse.errorMessage,
      });
    }
  } catch (error) {
    console.error('Erro ao gerar fatura:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao gerar fatura',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

/**
 * Rota para sincronizar um produto com o Diamante
 */
router.post('/sync-product/:productId', async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      success: false, 
      message: 'Autenticação necessária' 
    });
  }

  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    return res.status(400).json({
      success: false,
      message: 'ID do produto inválido',
    });
  }

  // Esta seria a implementação completa para sincronizar produtos
  // Por ora, retornamos um marcador de posição para implementação futura
  return res.status(200).json({
    success: true,
    message: 'Sincronização de produto com o Diamante iniciada',
    details: 'Implementação completa em desenvolvimento'
  });
});

export default router;
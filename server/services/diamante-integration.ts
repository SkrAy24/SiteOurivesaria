import axios from 'axios';
import { User, Order, OrderItem, Product } from '@shared/schema';

interface DiamanteBillingData {
  orderId: number;
  customer: DiamanteBillingCustomer;
  items: DiamanteBillingItem[];
  paymentMethod: string;
  vatNumber?: string;
  notes?: string;
}

interface DiamanteBillingCustomer {
  name: string;
  email: string;
  vatNumber?: string; // NIF em Portugal
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  phone?: string;
}

interface DiamanteBillingItem {
  reference: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // Taxa de IVA (normalmente 23% para a maioria dos produtos em Portugal)
}

interface DiamanteBillingResponse {
  success: boolean;
  invoiceNumber?: string;
  invoiceUrl?: string;
  errorMessage?: string;
}

/**
 * Serviço de integração com o software Diamante de faturação
 */
export class DiamanteIntegrationService {
  private apiUrl: string;
  private apiKey: string;
  
  constructor() {
    this.apiUrl = process.env.DIAMANTE_API_URL || '';
    this.apiKey = process.env.DIAMANTE_API_KEY || '';
    
    if (!this.isConfigured()) {
      console.warn('Diamante API credentials are not properly configured');
    }
  }
  
  /**
   * Verifica se as credenciais da API do Diamante estão configuradas
   */
  public isConfigured(): boolean {
    return Boolean(this.apiUrl && this.apiKey);
  }
  
  /**
   * Testa a conexão com a API do Diamante
   */
  public async testConnection(): Promise<boolean> {
    if (!this.isConfigured()) {
      return false;
    }
    
    try {
      const response = await axios.get(`${this.apiUrl}/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao testar conexão com o Diamante:', error);
      return false;
    }
  }
  
  /**
   * Envia um pedido para o Diamante para gerar uma fatura
   */
  public async createInvoice(order: Order, user: User, orderItems: OrderItem[], products: Product[]): Promise<DiamanteBillingResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        errorMessage: 'API do Diamante não está configurada'
      };
    }
    
    try {
      const invoiceData = this.formatOrderForDiamante(order, user, orderItems, products);
      
      const response = await axios.post(`${this.apiUrl}/invoices`, invoiceData, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201 && response.data) {
        return {
          success: true,
          invoiceNumber: response.data.invoiceNumber,
          invoiceUrl: response.data.invoiceUrl
        };
      } else {
        return {
          success: false,
          errorMessage: 'Resposta inesperada do Diamante'
        };
      }
    } catch (error) {
      console.error('Erro ao gerar fatura no Diamante:', error);
      let errorMessage = 'Erro desconhecido ao gerar fatura';
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = `Erro ${error.response.status}: ${error.response.data?.message || error.message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        errorMessage
      };
    }
  }
  
  /**
   * Formata um pedido para o formato esperado pelo Diamante
   */
  private formatOrderForDiamante(
    order: Order, 
    user: User, 
    orderItems: OrderItem[], 
    products: Product[]
  ): DiamanteBillingData {
    // Criar um mapa de produtos por ID para facilitar a busca
    const productMap = new Map<number, Product>();
    products.forEach(product => {
      productMap.set(product.id, product);
    });
    
    // Formatar itens para o formato do Diamante
    const billingItems: DiamanteBillingItem[] = orderItems
      .filter(item => item.productId !== null)
      .map(item => {
        const productId = item.productId as number; // Já filtramos os nulos acima
        const product = productMap.get(productId);
        
        if (!product) {
          throw new Error(`Produto com ID ${productId} não encontrado`);
        }
      
      // Usar valores padrão para os campos que podem não existir
      const vatRate = product.vatRate || 23; // 23% é o padrão em Portugal
      const reference = product.sku || `PROD-${product.id}`;
      const unitPrice = parseFloat(item.price.toString());
      
      return {
        reference,
        description: product.name,
        quantity: item.quantity,
        unitPrice,
        vatRate
      };
    });
    
    // Extrair informações de endereço
    const addressParts = (order.shippingAddress || '').split(',');
    const street = addressParts[0] || '';
    const postalCode = addressParts[1]?.trim() || '';
    const city = addressParts[2]?.trim() || '';
    const country = 'Portugal'; // Por padrão, assumimos Portugal
    
    // Extrair método de pagamento
    const paymentMethod = order.paymentMethod || 'card';
    
    return {
      orderId: order.id,
      customer: {
        name: user.name || user.username,
        email: user.email,
        vatNumber: user.vatNumber || undefined,
        address: {
          street,
          postalCode,
          city,
          country
        },
        phone: user.phone || undefined
      },
      items: billingItems,
      paymentMethod,
      vatNumber: user.vatNumber || undefined,
      notes: `Pedido #${order.id} - ${order.status}`
    };
  }
  
  /**
   * Sincroniza o estoque com o Diamante após uma venda
   */
  public async syncInventory(orderItems: OrderItem[]): Promise<boolean> {
    if (!this.isConfigured()) {
      return false;
    }
    
    try {
      // Esta é uma implementação simulada
      // Em uma implementação real, você enviaria os dados para o Diamante
      console.log('Sincronizando estoque com o Diamante:', orderItems.length, 'itens');
      
      // Simulação de chamada à API
      /*
      const response = await axios.post(`${this.apiUrl}/inventory/sync`, {
        items: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.status === 200;
      */
      
      // Por enquanto, retornamos true para simular sucesso
      return true;
    } catch (error) {
      console.error('Erro ao sincronizar estoque com o Diamante:', error);
      return false;
    }
  }
}

export const diamanteService = new DiamanteIntegrationService();
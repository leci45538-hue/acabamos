/**
 * Hour Pricing Service
 * Sistema de preçagem por HORAS com extras
 * 
 * Regra:
 * - Base: R$ 40
 * - Por hora: +R$ 20 até 8h
 * - Após 8h: +40% sobre valor de 8h
 * - Extras com 40% de taxa (exceto Levar Produtos que é fixo)
 */

class HourPricingService {
  /**
   * Constantes de preçagem
   */
  static BASE_PRICE = 40; // R$ 40 iniciais
  static PRICE_PER_HOUR = 20; // R$ 20 por hora
  static HOURS_THRESHHOLD = 8; // Até 8 horas normal
  static SURGE_TAX = 0.40; // 40% de taxa após 8h
  static EXTRAS_TAX = 0.40; // 40% de taxa nos extras

  /**
   * Extras disponíveis
   */
  static EXTRAS = {
    organizacao: {
      name: 'Organização',
      type: 'percentage', // 10% do valor base
      value: 0.10,
      withTax: true
    },
    pos_obra: {
      name: 'Pós-Obra',
      type: 'percentage', // 30% do valor base
      value: 0.30,
      withTax: true
    },
    levar_produtos: {
      name: 'Levar os Produtos',
      type: 'fixed', // R$ 30 fixo
      value: 30,
      withTax: false // Sem taxa
    }
  };

  /**
   * Calcular preço para um agendamento
   * @param {number} hours - Quantidade de horas
   * @param {array} extras - Array de extras selecionados
   * @returns {object} Breakdown do preço
   */
  static calculatePrice(hours, extras = []) {
    if (hours <= 0) throw new Error('Hours must be greater than 0');

    // ============ CÁLCULO DO PREÇO BASE ============
    let basePrice = this.BASE_PRICE;

    if (hours <= this.HOURS_THRESHHOLD) {
      // Até 8 horas: R$ 40 + (horas - 1) * R$ 20
      // Porque a primeira hora já está incluída no base
      basePrice = this.BASE_PRICE + (hours - 1) * this.PRICE_PER_HOUR;
    } else {
      // Após 8 horas: R$ 40 + 7*20 = R$ 180, depois * 1.4
      // Preço de 8 horas
      const eightHourPrice = this.BASE_PRICE + (this.HOURS_THRESHHOLD - 1) * this.PRICE_PER_HOUR;
      // Horas adicionais (acima de 8)
      const extraHours = hours - this.HOURS_THRESHHOLD;
      // Taxa de 40% aplicada
      basePrice = eightHourPrice * (1 + this.SURGE_TAX) + extraHours * this.PRICE_PER_HOUR;
    }

    // ============ CÁLCULO DOS EXTRAS ============
    let extrasTotal = 0;
    const extrasBreakdown = [];

    if (extras && Array.isArray(extras)) {
      for (const extraId of extras) {
        const extra = this.EXTRAS[extraId];
        if (!extra) continue;

        let extraPrice = 0;

        if (extra.type === 'percentage') {
          // Calcular percentual sobre a base
          extraPrice = basePrice * extra.value;
          
          // Aplicar taxa de 40% se necessário
          if (extra.withTax) {
            extraPrice = extraPrice * (1 + this.EXTRAS_TAX);
          }
        } else if (extra.type === 'fixed') {
          // Valor fixo
          extraPrice = extra.value;
          // Não aplicar taxa (levar_produtos não tem taxa)
        }

        extrasTotal += extraPrice;
        extrasBreakdown.push({
          name: extra.name,
          type: extra.type,
          baseValue: extra.type === 'percentage' ? basePrice * extra.value : extra.value,
          tax: extra.withTax ? (basePrice * extra.value * this.EXTRAS_TAX) : 0,
          total: extraPrice
        });
      }
    }

    // ============ PREÇO FINAL ============
    const finalPrice = basePrice + extrasTotal;

    return {
      hours,
      basePrice: Math.round(basePrice * 100) / 100,
      extrasBreakdown,
      extrasTotal: Math.round(extrasTotal * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      breakdown: {
        basePriceCalculation: `R$ ${this.BASE_PRICE} + (${hours - 1} × R$ ${this.PRICE_PER_HOUR})`,
        extrasTax: `${this.EXTRAS_TAX * 100}% nos extras (exceto Levar Produtos)`,
        summary: `R$ ${Math.round(basePrice * 100) / 100} + R$ ${Math.round(extrasTotal * 100) / 100} = R$ ${Math.round(finalPrice * 100) / 100}`
      }
    };
  }

  /**
   * Calcular múltiplos agendamentos (para vários locais)
   * @param {array} bookings - Array com {hours, extras, location}
   * @returns {object} Breakdown com opções de pagamento
   */
  static calculateMultipleBookings(bookings) {
    const results = [];
    let totalPrice = 0;

    for (const booking of bookings) {
      const priceData = this.calculatePrice(booking.hours, booking.extras);
      results.push({
        location: booking.location || `Local ${results.length + 1}`,
        ...priceData
      });
      totalPrice += priceData.finalPrice;
    }

    return {
      bookings: results,
      totalPrice: Math.round(totalPrice * 100) / 100,
      paymentOptions: {
        individual: {
          description: 'Pagamento separado para cada local',
          totalPrice: Math.round(totalPrice * 100) / 100,
          payments: results.map(b => ({
            location: b.location,
            amount: b.finalPrice
          }))
        },
        combined: {
          description: 'Pagamento único para todos os locais',
          totalPrice: Math.round(totalPrice * 100) / 100,
          discount: 0 // Pode aplicar desconto se quiser
        }
      }
    };
  }

  /**
   * Listar extras disponíveis
   */
  static getAvailableExtras() {
    return Object.entries(this.EXTRAS).map(([key, value]) => ({
      id: key,
      name: value.name,
      type: value.type,
      value: value.value,
      withTax: value.withTax,
      formattedValue: value.type === 'percentage' 
        ? `${value.value * 100}% da base`
        : `R$ ${value.value}`
    }));
  }
}

module.exports = HourPricingService;

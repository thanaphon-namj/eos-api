  //   // Check if item already exists with same order_id, menu_id and note
  //   const exist = await this.orderItemRepository.findOne({
  //     where: { order_id: id, menu_id: item.id, note: item.note },
  //     relations: ['options'],
  //     select: ['id', 'quantity', 'order_id', 'options'],
  //   });
    
  //   // If item exists with same options, just update quantity
  //   if (exist) {
  //     const options = exist.options.map(option => option.option_id);
  //     const optionsMatch = compareArray(options, item.options || []);
      
  //     if (optionsMatch) {
  //       await this.orderItemRepository.update(exist.id, {
  //         quantity: exist.quantity + item.quantity
  //       });
  //     } else {
  //       // Create new item if options are different
  //       await this.saveNewOrderItem(id, item);
  //     }
  //   } else {
  //     // Create new item if it doesn't exist
  //     await this.saveNewOrderItem(id, item);
  //   }
    
  //   // Calculate totals and update order status
  //   await this.calculate(id);
  //   const result = await this.orderRepository.update(id, {
  //     status: OrderStatus.Pending,
  //   });
    
  //   return result.affected > 0;
  // }
  
  // // Helper method to avoid code duplication
  // private async saveNewOrderItem(orderId: number, item: OrderItemDto) {
  //   const orderItem = new OrderItem();
  //   orderItem.quantity = item.quantity;
  //   orderItem.note = item.note;
  //   orderItem.order_id = orderId;
  //   orderItem.menu_id = item.id;
    
  //   const result = await this.orderItemRepository.save(orderItem);
    
  //   // Create variants in bulk if options exist
  //   if (item.options?.length) {
  //     const variants = item.options.map(optionId => ({
  //       item_id: result.id,
  //       option_id: optionId
  //     }));
      
  //     await this.itemVariantRepository.save(variants);
  //   }
    
  //   return result;
  // }
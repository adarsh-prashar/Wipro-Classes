const orders = {
  1: { id: 1, customer: 'John Doe', items: ['Pizza', 'Coke'], total: 25.99 },
  2: { id: 2, customer: 'Jane Smith', items: ['Burger', 'Fries'], total: 15.50 },
  3: { id: 3, customer: 'Bob Johnson', items: ['Salad', 'Water'], total: 12.00 }
};

// 1. Fetch order details using Callbacks (Error-first convention)
function fetchOrder(orderId, callback) {
  console.log('Fetching order details...');
  setTimeout(() => {
    if (orders[orderId]) {
      callback(null, orders[orderId]); // Success: error is null, data is the order
    } else {
      callback(new Error('Order not found'), null); // Error: error object, data is null
    }
  }, 1000); // Simulate delay
}

// 2. Process payment using Promises
function processPayment(order) {
  console.log('Processing payment...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.total > 0) {
        resolve({ status: 'Payment successful', amount: order.total });
      } else {
        reject(new Error('Invalid payment amount'));
      }
    }, 1500); 
  });
}

// 3. Generate invoice using Async/Await
async function generateInvoice(order, paymentResult) {
  console.log('Generating invoice...');
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    const invoice = {
      orderId: order.id,
      customer: order.customer,
      items: order.items,
      total: order.total,
      paymentStatus: paymentResult.status,
      invoiceDate: new Date().toISOString()
    };
    return invoice;
  } catch (error) {
    throw new Error('Failed to generate invoice');
  }
}

// Demonstration functions
function demonstrateCallbacks() {
  console.log('\n=== Demonstrating Callbacks ===');
  fetchOrder(1, (error, order) => {
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('Success: Order fetched', order);
    }
  });

  // Demonstrate error case
  fetchOrder(999, (error, order) => {
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('Success: Order fetched', order);
    }
  });
}

function demonstratePromises() {
  console.log('\n=== Demonstrating Promises ===');
  const order = orders[2];

  processPayment(order)
    .then(result => {
      console.log('Payment processed successfully:', result);
    })
    .catch(error => {
      console.log('Payment failed:', error.message);
    });

  // Demonstrate reject case
  const invalidOrder = { total: 0 };
  processPayment(invalidOrder)
    .then(result => {
      console.log('Payment processed successfully:', result);
    })
    .catch(error => {
      console.log('Payment failed:', error.message);
    });
}

async function demonstrateAsyncAwait() {
  console.log('\n=== Demonstrating Async/Await ===');
  try {
    const order = orders[3];
    const paymentResult = await processPayment(order);
    console.log('Payment processed:', paymentResult);

    const invoice = await generateInvoice(order, paymentResult);
    console.log('Invoice generated:', invoice);
  } catch (error) {
    console.log('Error in async/await flow:', error.message);
  }

  // Demonstrate error handling
  try {
    const invalidOrder = { total: 0 };
    const paymentResult = await processPayment(invalidOrder);
    const invoice = await generateInvoice(invalidOrder, paymentResult);
  } catch (error) {
    console.log('Error in async/await flow:', error.message);
  }
}

// Complete order processing flow (combining all approaches)
function processOrder(orderId) {
  console.log('\n=== Complete Order Processing Flow ===');
  console.log(`Processing order ${orderId}...`);

  // Step 1: Fetch order using callbacks
  fetchOrder(orderId, (error, order) => {
    if (error) {
      console.log('Failed to fetch order:', error.message);
      return;
    }

    console.log('Order fetched:', order);

    // Step 2: Process payment using promises
    processPayment(order)
      .then(paymentResult => {
        console.log('Payment processed:', paymentResult);

        // Step 3: Generate invoice using async/await
        return generateInvoice(order, paymentResult);
      })
      .then(invoice => {
        console.log('Invoice generated:', invoice);
        console.log('Order processing completed successfully!');
      })
      .catch(error => {
        console.log('Order processing failed:', error.message);
      });
  });
}

// Run demonstrations
console.log('FoodExpress Order Processing System Demo');
demonstrateCallbacks();
demonstratePromises();
demonstrateAsyncAwait();
processOrder(1);
processOrder(999); // Test error case

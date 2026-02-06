/**
 * Swagger/OpenAPI Configuration
 * API Documentation Configuration for all 130+ endpoints
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Avante API - Professional Services Booking Platform',
      version: '3.0.0',
      description: 'Complete enterprise-grade API for booking professional services with advanced features',
      contact: {
        name: 'Avante Team',
        email: 'api@avante.com',
        url: 'https://avante.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server'
      },
      {
        url: 'https://api.avante.com/api',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Bearer token for authentication'
        },
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
          description: 'API Key for service-to-service communication'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'email', 'name', 'role'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique user identifier'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            name: {
              type: 'string',
              description: 'User full name'
            },
            phone: {
              type: 'string',
              description: 'User phone number'
            },
            role: {
              type: 'string',
              enum: ['admin', 'manager', 'staff', 'customer', 'partner'],
              description: 'User role'
            },
            avatar: {
              type: 'string',
              format: 'uri',
              description: 'User profile picture URL'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Booking: {
          type: 'object',
          required: ['id', 'customerId', 'serviceId', 'professionalId', 'scheduledTime', 'status'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            customerId: {
              type: 'string',
              format: 'uuid'
            },
            serviceId: {
              type: 'string',
              format: 'uuid'
            },
            professionalId: {
              type: 'string',
              format: 'uuid'
            },
            scheduledTime: {
              type: 'string',
              format: 'date-time'
            },
            duration: {
              type: 'integer',
              description: 'Duration in minutes'
            },
            price: {
              type: 'number',
              format: 'decimal'
            },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'completed', 'cancelled'],
              description: 'Booking status'
            },
            notes: {
              type: 'string'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Payment: {
          type: 'object',
          required: ['id', 'bookingId', 'amount', 'status'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            bookingId: {
              type: 'string',
              format: 'uuid'
            },
            amount: {
              type: 'number',
              format: 'decimal'
            },
            method: {
              type: 'string',
              enum: ['stripe', 'pix', 'boleto', 'credit_card', 'apple_pay', 'google_pay'],
              description: 'Payment method'
            },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
              description: 'Payment status'
            },
            transactionId: {
              type: 'string',
              description: 'External transaction ID'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          required: ['code', 'message'],
          properties: {
            code: {
              type: 'string',
              description: 'Error code'
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            statusCode: {
              type: 'integer',
              description: 'HTTP status code'
            },
            timestamp: {
              type: 'string',
              format: 'date-time'
            },
            path: {
              type: 'string',
              description: 'API endpoint path'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization'
      },
      {
        name: 'OAuth',
        description: 'OAuth 2.0 login with social providers'
      },
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Bookings',
        description: 'Booking management'
      },
      {
        name: 'Payments',
        description: 'Payment processing'
      },
      {
        name: 'Search',
        description: 'Service search and discovery'
      },
      {
        name: 'Analytics',
        description: 'Analytics and reporting'
      },
      {
        name: 'Admin',
        description: 'Admin panel endpoints'
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = { specs, options };

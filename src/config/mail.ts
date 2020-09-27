interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}


export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'noreply@math2app.com',
      name: 'Math2App'
    }
  }
} as IMailConfig;

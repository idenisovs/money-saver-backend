declare global {
  namespace NodeJS {
    interface Global {
      basedir: string
    }
  }
}

export default global;
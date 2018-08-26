module.exports = (pluginOptions = {}) => (nextConfig = {}) => {
  const { extension = /\.task.js$/ } = pluginOptions

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        )
      }

      config.module.rules.push({
        test: extension,
        use: [options.defaultLoaders.babel, require.resolve('./loader')],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}

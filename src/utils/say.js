import _ from 'lodash'

export const sayHi = () => {
  // const msg = _.join(['hello', 'world'])
  const msg = _.join(['hello', 'world', 'webpack 5！!!!!'])

  const arr = [1, 2, 3]
  arr.forEach(item => {
    console.log(item)
  })

  console.log(msg)
}

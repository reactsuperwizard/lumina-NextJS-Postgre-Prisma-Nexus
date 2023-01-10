export const slugify = (dumbString: string) => {
  const specialChar =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;&-'
  const slugChar =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz        '
  const specialCharIndex = new RegExp(specialChar.split('').join('|'), 'g')

  return (
    '@' +
    dumbString
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '') // Replace spaces with -
      .replace(specialCharIndex, c => slugChar.charAt(specialChar.indexOf(c))) // Replace special characters
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  )
}

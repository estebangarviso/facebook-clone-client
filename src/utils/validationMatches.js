const validationMatches = {
  name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //ref: https://www.facebook.com/business/help/523719398041952?id=1240182842783684
  photo: /\.(bmp|dib|heic|heif|iff|jfif|jp2|jpe|jpeg|jpg|png|psd|tif|tiff|wbmp|webp|xbm)$/i,
  // ref: https://www.facebook.com/help/218673814818907
  video:
    /\.(3g2|3gp|3gpp|asf|avi|dat|divx|dv|f4v|flv|gif|m2ts|m4v|mkv|mod|mov|mp4|mpe|mpeg|mpeg4|mpg|mts|nsv|ogm|ogv|qt|tod|ts|vob|wmv)$/i
};

validationMatches.media = new RegExp(`${validationMatches.photo.source}|${validationMatches.video.source}`);

export default validationMatches;

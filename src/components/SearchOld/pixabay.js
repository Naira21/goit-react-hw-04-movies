// //OOP
// export class PixabayFetch {
//   constructor(API_KEY, BASE_URL) {
//     this.BASE_URL = BASE_URL;
//     this.API_KEY = API_KEY;
//     this.endpoint = `search`;
//     this.source = `movie`;
//     this._searchQuery = ""; //имя свойства, с которым работает геттер и сеттер (их имена одинаковые), должно отличаться. Для этого используем паттерн — нижнее подчеркивание
//   }
//   //так как мы передаем пустое значение для searchQuery, то необходимо ввести для них геттер ии сеттер
//   get searchQuery() {
//     return this._searchQuery;
//   }
//   set searchQuery(value) {
//     return (this._searchQuery = value);
//   }

 
//     // axios.defaults.baseURL = this.BASE_URL;
//     // console.log("searchQ:", this.searchQuery, "page:", this.page);
//     // let url = `?q=${this.searchQuery}&page=${this.page}&key=${this.API_KEY}&image_type=${this.imageType}&orientation=${this.imageOrient}&per_page=${this.perPage}`;

//      //let searchMovie = `${this.BASE_URL}/${this.endpoint}/${this.source}?api_key=${this.API_KEY}&query=${this.searchQuery}`;
        
//         //console.log(searchMovie);
// fetch(searchMovie)
//   .then(result => result.json())
//             .then(data => data.results)
//           .catch((err) => err.message)
    
//     // try {
//     //   const result = await axios.get(url);
//     //   const data = result.data.hits;
//     //   return data;
//     // } catch (err) {
//     //   return err.message;
//     // }
  
// }

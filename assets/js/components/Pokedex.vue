<template>
  <main>
    <header>
      <h1>Pokedex</h1>
    </header>

    <nav>
      <div id="filter">Type:</div>

      <el-select id="select" v-model="typeToShow" @change="setType" placeholder="Select">
        <el-option class="option"
          v-for="type in options"
          :key="type.value"
          :label="type.label"
          :value="type.value">
        </el-option>
      </el-select>

      <div id="pagination">
        <el-pagination class="pagination_top_bg"
          @current-change="setPage"
          :current-page.sync="currentPage"
          background
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>

        <el-pagination class="pagination_top_small"
          @current-change="setPage"
          :current-page.sync="currentPage"
          small
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </nav>

    <article>
      <ul id="pokemons">
        <li class="data" v-for="poke in slicePage(sortPokemons(pokemonsOnPage))" :key="poke.id" >
          <img class="poke-img" :src="poke.sprites.front_default">
          <div class="poke-name">{{ poke.name }}</div>
          <ul class="types">
            <li class="type" v-for="type in sortTypes(poke.types)" :key="type.name">
              <div class="poke-type">{{ type.type.name }}</div>
            </li>
          </ul>
          <div class="poke-id">#{{ poke.id }}</div>
        </li>
      </ul>

      <el-pagination class="pagination_bottom_bg"
        @current-change="setPage"
        :current-page.sync="currentPage"
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @click.native="scrollToTop">
      </el-pagination>

      <el-pagination class="pagination_bottom_small"
        @current-change="setPage"
        :current-page.sync="currentPage"
        small
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @click.native="scrollToTop">
      </el-pagination>
    </article>

    <footer>
      © M. P. 2020
    </footer>
  </main>
</template>

<script>

  export default {

    data() {
      return {
        pokemons: [],
        pokemonsOnPage: [],
        typeToShow: 'all',
        total: 800,
        pageSize: 30,
        currentPage: 1,
        options: [{
          value: 'all',
          label: 'All'
        }, {
          value: 'normal',
          label: 'Normal',
        }, {
          value: 'fighting',
          label: 'Fighting',
        }, {
          value: 'flying',
          label: 'Flying',
        }, {
          value: 'poison',
          label: 'Poison',
        }, {
          value: 'ground',
          label: 'Ground',
        }, {
          value: 'rock',
          label: 'Rock',
        }, {
          value: 'bug',
          label: 'Bug',
        }, {
          value: 'ghost',
          label: 'Ghost',
        }, {
          value: 'steel',
          label: 'Steel',
        }, {
          value: 'fire',
          label: 'Fire',
        }, {
          value: 'water',
          label: 'Water',
        }, {
          value: 'grass',
          label: 'Grass',
        }, {
          value: 'electric',
          label: 'Electric',
        }, {
          value: 'psychic',
          label: 'Psychic',
        }, {
          value: 'ice',
          label: 'Ice',
        }, {
          value: 'dragon',
          label: 'Dragon',
        }, {
          value: 'fairy',
          label: 'Fairy',
        }, {
          value: 'dark',
          label: 'Dark',
        }],
      };
    },

    methods: {
      sortPokemons(array) {
          return _.orderBy(array, 'id', 'asc');
      },

      sortTypes(arrays) {
        return _.orderBy(arrays, 'slot', 'asc');
      },
      
      compareTypes(pokemon){
        if(pokemon.types[0].type.name == this.typeToShow){
          return true;
        }else if(pokemon.types.length == 2){
          if(pokemon.types[1].type.name == this.typeToShow){
          return true;
          }
        } 
        return false;
      },

      setType(type) {
        this.currentPage = 1;
        if(type == "all") {
          this.pokemonsOnPage = this.slicePage(this.sortPokemons(this.pokemons));
          this.total = this.pokemons.length;
        }else{
          this.pokemonsOnPage = this.slicePage(this.sortPokemons(this.pokemons).filter(
                                    x => this.compareTypes(x)));
          this.total = this.pokemons.filter(x => this.compareTypes(x)).length;
        }
      },

      setPage() {
        if(this.typeToShow == "all") {
          this.pokemonsOnPage = this.sortPokemons(this.pokemons);
        }else{
          this.pokemonsOnPage = this.sortPokemons(this.pokemons).filter(x => this.compareTypes(x));
        }
      },

      slicePage(pokemons){
        return pokemons.slice(this.pageSize*(this.currentPage-1), this.pageSize*this.currentPage);
      },

      scrollToTop() {
        var element = document.getElementById("pagination");
        var top = element.offsetTop;
        window.scrollTo(0, top);
      }
    },
    
    mounted () {
      for(let x=1; x<=this.total; x++){
        axios
          .get('https://pokeapi.co/api/v2/pokemon/'+x)
          .then(response => (this.pokemons.push(...[response.data])));
      }
      this.pokemonsOnPage = this.pokemons;
      console.log(this.pokemons);
    }
  };


</script>

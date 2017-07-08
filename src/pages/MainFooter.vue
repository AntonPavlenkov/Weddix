<template>
  <section class="footer">
    <span class="powered-by">
      <h2>Weddix</h2> by Keren,Elad and Anton </span>
    <span class="git-logo">
      <a href="https://github.com/AntonPavlenkov/wixer">
      
      <img class="git-img" src="../assets/github-log.png" width="40px" height="40px">
      </a>
    </span>
  
    <span class="about-details">
      <span class="details">Keren
        <i class="material-icons">email</i></span>
      <span class="details">Elad
       <i class="material-icons">email</i></span>
      <span class="details">Anton
       <i class="material-icons">email</i></span>
    </span>
  
  </section>
</template>

<script>
export default {
  name: 'Footer',

  data() {
    return {


    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: #E5E9F2;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-content: center;
}

.powered-by {
  text-align: center;
}

.about-details {
  display: flex;
  flex-flow: row wrap;
}
.details{
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
}

.git-logo {
  align-self: center;
}

.git-img {
  cursor: pointer;
  border-radius: 50%;
}

.git-img:hover {
  background-color: grey;
}

h2{
  color: #324057;
  font-size: 2em;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>



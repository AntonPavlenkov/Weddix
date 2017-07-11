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
        <a class="email-icon" href="mailto:kerendot@gmail.com">
          <i class="material-icons">email</i>
        </a>
      </span>
      <span class="details">Elad
        <a class="email-icon" href="mailto:okc.elad.35@gmail.com">
          <i class="material-icons">email</i>
        </a>
      </span>
      <span class="details">Anton
        <a class="email-icon" href="mailto:pavlenkov47@gmail.com">
          <i class="material-icons">email</i>
        </a>
      </span>
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

<style lang="scss" scoped>
@media (max-width: 650px) {
  flex-flow: column nowrap;
}



.footer {
  position: relative;
  width: 100%;
  background-color: #E5E9F2;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 1vh;
  h2{
    margin: 0;
    padding: 0;
  }
  i {
    height: 10px;
  }
}

.powered-by {
  text-align: center;
}

.about-details {
  align-self: center;
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 650px) {
    display: none;
  }
}

.details {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
}

.git-logo {
  align-self: center;
  margin: 10px;
}

.git-img {
  cursor: pointer;
  border-radius: 50%;
}

.git-img:hover {
  background-color: grey;
}

.details {
  margin: 5px;
}

a {
  color: black;
}

h2 {
  color: #324057;
  font-size: 2em;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>



<template>
  <div class="container">
    <div class="row">
      <div class="col-4 mx-auto pt-5">
        <div class="card">
          <img class="card-img-top" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/oslo.jpg" alt="Bologna">
          <div class="card-body text-center">
            <img class="avatar rounded-circle" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/robert.jpg" alt="Bologna">
            <h4 class="card-title">{{ user.name }}</h4>
            <h6 class="card-subtitle mb-2 text-muted"> {{ user.email }}</h6>
            <p class="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly
              believable. </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'Auth/user'
    })
  }
}
</script>

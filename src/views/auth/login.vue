<template>
  <div class="signup-form">
    <form @submit.prevent="submitForm">
      <div class="form-header">
        <h2>Sign In</h2>
        <p>Fill out this form to authenticated in!</p>
      </div>
      <div class="form-group">
        <input type="email" class="form-control" name="email" required="required" placeholder="Enter your email" v-model="form.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="password" required="required" placeholder="Enter your password" v-model='form.password'>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-sm btn-secondary text-left" :disabled="!isChanged" @click="resetForm">Clear</button>
        <button type="submit" class="btn btn-primary btn-sm text-right" :disabled="isUnfilled">Login</button>
      </div>
    </form>
    <div class="text-center small">Don't have an account?
      <router-link to="register">Register here</router-link>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  name: 'login',
  data: function () {
    return {
      isChanged: false,
      isUnfilled: false,
      form: this.initialForm()
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function () {
        this.formChanged()
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'Auth/login'
    }),
    /**
     * @return void
     */
    submitForm: async function () {
      this.login(this.form)
    },
    /**
     * Check whether something in the form has been changed
     */
    formChanged: function () {
      this.isChanged = true
      this.isUnfilled = false
      let form = Object.entries(this.form)
      // eslint-disable-next-line no-unused-vars
      for (let [name, value] of form) {
        if (this.empty(value)) {
          this.isUnfilled = true
          break
        }
      }
    },
    /**
     * Reset form data
     * @return void
     */
    resetForm: function () {
      this.isChanged = false
      this.isUnfilled = true
      this.form = this.initialForm()
    },
    /**
     *
     * @return {{password: null, email: null}}
     */
    initialForm: function () {
      return {
        email: null,
        password: null
      }
    }
  }
}
</script>

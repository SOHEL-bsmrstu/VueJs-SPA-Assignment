<template>
  <div class="kt-pagination kt-pagination--brand kt-pagination--circle float-right">
    <ul class="kt-pagination__links ">
      <li class="kt-pagination__link--first" :class="[ isFirstPage() ? disabledClass : '' ]">
        <a title="First Page" @click="firstPage">
          <i class="fa fa-angle-double-left"></i>
        </a>
      </li>
      <li class="kt-pagination__link--prev" :class="[ isFirstPage() ? disabledClass : '' ]">
        <a title="Previous Page" @click="prevPage">
          <i class="fa fa-angle-left"></i>
        </a>
      </li>
      <li v-for="(page, key) in pages" :class="[ isSelected(page) ? activeClass : '' ]" :key="key">
        <a @click="changePage(page)">{{ page }}</a>
      </li>
      <li class="kt-pagination__link--next">
        <a title="Next Page" :class="[ isLastPage() ? disabledClass : '' ]" @click="nextPage">
          <i class="fa fa-angle-right"></i>
        </a>
      </li>
      <li class="kt-pagination__link--last" :class="[ isLastPage() ? disabledClass : '' ]">
        <a title="Last Page" @click="lastPage">
          <i class="fa fa-angle-double-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * @see https://github.com/lokyoung/vuejs-paginate
     */
    pages: function () {
      let items = {}
      let addItem = (index, mock = false) => {
        items[index] = (index + 1)
      }

      if (this.meta.pageCount <= this.pageRange) {
        for (let index = 0; index < this.meta.pageCount; index++) {
          addItem(index)
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)

        let selectedRangeLow = 0
        if (this.meta.currentPage - halfPageRange > 0) {
          selectedRangeLow = this.meta.currentPage - 1 - halfPageRange
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1
        if (selectedRangeHigh >= this.meta.pageCount) {
          selectedRangeHigh = this.meta.pageCount - 1
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1
        }

        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.meta.pageCount - 1; i++) {
          addItem(i)
        }
      }

      return items
    }
  },
  data () {
    return {
      pageRange: 5,
      activeClass: 'kt-pagination__link--active',
      disabledClass: 'kt-pagination__link--disabled'
    }
  },
  methods: {
    isFirstPage: function () {
      return (this.meta.currentPage === 1) || (typeof this.meta.pageCount === 'undefined')
    },
    isLastPage: function () {
      return (this.meta.currentPage === this.meta.pageCount) || (this.meta.pageCount === 0)
    },
    pageText: function (page) {
      return page.index + 1
    },
    isSelected: function (page) {
      return page === this.meta.currentPage
    },
    changePage: function (selected) {
      if (typeof this.meta.pageCount === 'undefined') return

      if (this.meta.currentPage === selected) return

      this.meta.currentPage = selected
      this.$emit('page-change', selected)
    },
    prevPage: function () {
      if (this.selected <= 1) return

      this.changePage(this.meta.currentPage - 1)
    },
    nextPage: function () {
      if (this.meta.currentPage >= this.meta.pageCount) return

      this.changePage(this.meta.currentPage + 1)
    },
    firstPage () {
      if (this.meta.currentPage <= 1) return

      this.changePage(1)
    },
    lastPage () {
      if (this.meta.currentPage >= this.meta.pageCount) return

      this.changePage(this.meta.pageCount)
    }
  }
}
</script>

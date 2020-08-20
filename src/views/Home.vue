<template>
  <paginated-list
    url="/api/products/"
    entityName="product"
  >
    <template
      v-slot:loader="{ entitiesPerPage }"
    >
      <v-row>
        <v-col
          v-for="n in entitiesPerPage"
          :key="n"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-skeleton-loader type="card"/>
        </v-col>
      </v-row>
    </template>
    <template slot-scope="{ entities }">
      <v-row>
        <v-col
          v-for="product in entities"
          :key="product.id"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <product-card :product="product" />
        </v-col>
      </v-row>
    </template>
  </paginated-list>
</template>

<script>
export default {
  name: 'Home'
}
</script>

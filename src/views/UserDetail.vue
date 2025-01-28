<template>
  <v-container>
    <v-card v-if="user">
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-text>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phone }}</p>
        <p>Website: {{ user.website }}</p>
        <p>
          Address: {{ user.address.street }}, {{ user.address.suite }},
          {{ user.address.city }},
          {{ user.address.zipcode }}
        </p>
        <p>
          Company: {{ user.company.name }} -
          {{ user.company.catchPhrase }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="goBack">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}

const user = ref<User | null>(null);
const loading = ref(true);
const route = useRoute();
const router = useRouter();

const fetchUser = async () => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${route.params.id}`
    );
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push({ name: "UserList" });
};

onMounted(() => {
  fetchUser();
});
</script>

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useCounterStore } from "./modules/testCountStore";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export {
  pinia,
  useCounterStore
}
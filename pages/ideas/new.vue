<script setup lang="ts">
// Types
import { buttonSize, buttonColor } from '~/types/button'
import type { Idea } from '~/types/idea'

// Services
import { createIdea } from '~/services/api'

// Components
import Input from '~/components/atoms/Input.vue'
import Textarea from '~/components/atoms/Textarea.vue'
import Button from '~/components/atoms/Button.vue'
import FormField from '~/components/molecules/FormField.vue'
import Header from '~/components/organisms/Header.vue'

const submitting = ref()
submitting.value = false

async function submitForm() {
    if (submitting.value) return

    const form = document.getElementById('newEntry')
    if (!form) return
    if (!(form instanceof HTMLFormElement)) return
    const formData = new FormData(form)
    
    const idea:Idea = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
    }
    if (idea.title == '' || idea.description == '') {
        // TODO: Display error message
        return
    }

    submitting.value = true
    createIdea(idea).then(() => {
        submitting.value = false
    })
}
</script>
<template>
    <div class="container">
        <Header>Nieuw Idee</Header>
        <form action="" id="newEntry">
            <FormField>
                <template #label>Titel</template>
                <template #input>
                    <Input :name="'title'" type="text" :placeholder="'Titel'" :required="true" />
                </template>
            </FormField>
            <FormField>
                <template #label>Omschrijving</template>
                <template #input>
                    <Textarea :name="'description'" :placeholder="'Omschrijving'" :required="true" :rows="10"></Textarea>
                </template>
            </FormField>
        </form>
        <Button :size="buttonSize.Large" :color="buttonColor.Primary" @click="submitForm()" :disabled="submitting">Toevoegen</Button>
    </div>
</template>
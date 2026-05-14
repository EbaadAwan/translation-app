const translateArea = document.getElementById('translate-area')
const resultArea = document.getElementById('result-area')
const translateBtn = document.getElementById('translate-btn')
const restartBtn = document.getElementById('restart')

translateBtn.addEventListener('click', async () => {
    const language = document.querySelector('input[name="languages"]:checked')

    if (!translateArea.value && !language) {
        console.log('Please enter a value and select a language')
        return
    } else if (!translateArea.value) {
        console.log('Please enter a value')
        return
    } else if (!language) {
        console.log('Please select a language')
        return
    }

    const res = await fetch('/api/translate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            text: translateArea.value,
            language: language.value
        })
    })

    if (!res.ok) {
        console.log("Server error:", res.status)
        return
    }

    const data = await res.json()

    if (data.error) {
        console.log(data.error)
        return
    }

    document.getElementById('lang').style.display = 'none'
    document.getElementById('result').style.display = 'flex'
    resultArea.value = data.translation
})

restartBtn.addEventListener('click', () => {
    document.querySelectorAll('input[name="languages"]').forEach(radio => {
        radio.checked = false
    })

    document.getElementById('lang').style.display = 'flex'
    document.getElementById('result').style.display = 'none'
    translateArea.value = ''
    resultArea.value = ''
})
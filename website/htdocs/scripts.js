

const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)


var request = new XMLHttpRequest()

request.open('GET', 'https://danwatkins.me/api.php', true)

request.onload = function() {
	var data = JSON.parse(this.response)

	if (request.status >= 200 && request.status < 400) {
		data.forEach(skill => {
			const card = document.createElement('div')
			card.setAttribute('class', 'skill')

			const skillTitle = document.createElement('h2')
			skillTitle.textContent = skill.name
			card.appendChild(skillTitle)

			const description = document.createElement('p')
			description.textContent = skill.details
			card.appendChild(description)

			const projSection = document.createElement('div')
			card.appendChild(projSection)

			skill.projects.forEach(project => {
				const projDiv = document.createElement('div')
				projSection.appendChild(projDiv)

				const projTitle = document.createElement('h4')
				projTitle.textContent = project.name
				projDiv.appendChild(projTitle)

				const projUrl = document.createElement('p')
				projUrl.textContent = project.url
				projDiv.appendChild(projUrl)
			}) 

			container.appendChild(card)
		})
	} else {
		console.log('error')
	}
}

request.send()
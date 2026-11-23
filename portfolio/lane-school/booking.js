const byId = id => document.getElementById(id)
const levels = [
  ['New to lessons', 'Water discovery', 'A first lesson focused on getting comfortable in the pool.'],
  ['Comfortable putting their face in', 'Float & glide', 'Practice supported floats and short glides.'],
  ['Can already float and glide', 'Stroke foundations', 'Connect glides with kicking and arm movements.']
]
const sessions = ['Saturday · 9:00 am', 'Saturday · 10:00 am', 'Sunday · 11:30 am']
let level = 0, session = 1
function showStep(step, focus = true) {
  const headings = ['What can your swimmer do?', 'Choose a session', 'Review your lesson', 'Demo booking complete']
  const [, name] = levels[level]
  const titles = '<small>' + (step < 3 ? 'Step ' + (step + 1) + ' of 3' : 'Confirmation') + '</small><h2 tabindex="-1">' + headings[step] + '</h2>'
  const options = (values, selected) => values.map((v,i) => '<option value="'+i+'" '+(i===selected?'selected':'')+'>'+v+'</option>').join('')
  const summary = '<p><b>'+name+'</b><br>'+sessions[session]+'<br>30 minutes · $25 CAD</p>'
  const contents = [
    '<label for="ability">Current comfort level</label><select id="ability">'+options(levels.map(l=>l[0]),level)+'</select><p id="recommend" aria-live="polite"></p><button data-step="1">See sessions</button>',
    '<p><b>'+name+'</b><br>30 minutes · $25 CAD per lesson</p><label for="session">Weekly session</label><select id="session"><option disabled>Saturday · 9:00 am — Full</option>'+sessions.slice(1).map((v,i)=>'<option value="'+(i+1)+'" '+(session===i+1?'selected':'')+'>'+v+'</option>').join('')+'</select><div><button data-step="2">Review lesson</button> <button class="plain" data-step="0">Change level</button></div>',
    summary+'<p>Sample booking. No payment or personal details required.</p><button data-step="3">Confirm demo booking</button> <button class="plain" data-step="1">Change session</button>',
    summary+'<p>This completes the prototype. No reservation was made.</p><button data-step="0" id="restart">Start again</button>'
  ]
  byId('stage').innerHTML = titles + contents[step]
  if (step === 0) {
    const recommend = () => { level = Number(byId('ability').value); byId('recommend').textContent = levels[level][1] + ' — ' + levels[level][2] }
    byId('ability').onchange = recommend
    recommend()
  }
  if (step === 1) byId('session').onchange = () => {session = Number(byId('session').value)}
  byId('stage').querySelectorAll('[data-step]').forEach(button => button.onclick = () => {
    if (button.id === 'restart') {level = 0; session = 1}
    showStep(Number(button.dataset.step))
  })
  if (focus) byId('stage').querySelector('h2').focus()
}
showStep(0,false)


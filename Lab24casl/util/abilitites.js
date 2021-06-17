const { AbilityBuilder, Ability } = require('@casl/ability')

let GUEST_ABILITY;

function defineAbilityFor(user) {
    if (user) return new Ability(defineRulesFor(user))
    GUEST_ABILITY = GUEST_ABILITY || new Ability(defineRulesFor({}))
    return GUEST_ABILITY
}

function defineRulesFor(user) {
    const builder = new AbilityBuilder(Ability)
    if(!user?.role) {
        defineGuestRules(builder)
        return builder.rules;
    }

    switch (user.role) {
      case 'admin':
        defineAdminRules(builder, user)
        break;
      case 'user':
        defineUserRules(builder, user)
        break;
    }
  
    return builder.rules;
}

function defineAdminRules({ can }) {
    can('manage', 'all');
}

function defineUserRules({ can }, user) {
    // can(['read', 'create', 'delete', 'update'], ['Article', 'Comment'], {
    //     author: user._id
    // });
    // can('publish', 'Article', {
    //     author: user._id,
    //     published: false
    // })
    // can(['read', 'update'], 'User', { _id: user._id });
    can(['read', ['Commits', 'Repos', 'Abilities']])
    can(['read', 'Users', {id: user.id}])
    can(['create', ['Repos', 'Commits']])
    can(['update', ['Repos', 'Commits']])
    can(['delete', ['Repos', 'Commits']])
}

function defineGuestRules({ can }) {
    can('read', ['Commits', 'Repos', 'Abilities']);
}

module.exports = {
    defineRulesFor,
    defineAbilityFor,
}
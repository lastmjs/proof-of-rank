window.process = {
    env: {
        NODE_ENV: window.location.hostname === 'proofofrank.link' ? 'production' : window.location.hostname.includes('.netlify.app') ? 'staging' : 'development',
        testing: false
    },
    argv: []
};
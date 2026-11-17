/**
 * @file cms-main-nulluser-tails.test.js
 * @description Coverage tail for cms/main.ts — the auth callback's
 * falsy-user arm: a resolved null user mounts the login view through the
 * `user ? dashboard : login` ternary's login side (distinct from the
 * auth-wiring rejection's catch arm).
 */
import { describe, test, expect, jest } from '@jest/globals'
import { CMS_TAGS } from '@cms/tokens.js'
import { CMS_IDS } from '@core/tokens/ids/cms.js'
import { HTML_TAGS } from '@core/tokens/elements/html.js'

jest.unstable_mockModule('@core/firebase.js', () => ({
  onAuthChange: jest.fn(async (cb) => cb(null)),
  signInWithGoogle: jest.fn(async () => ({ user: { uid: 'u1' } })),
  logoutUser: jest.fn(async () => {}),
  getDbInstance: jest.fn(async () => ({ db: true })),
}))

jest.unstable_mockModule('@core/utils/service-worker.js', () => ({
  dropStaleServiceWorkers: jest.fn(),
}))

/** Boot mount point — main.ts requires an existing #cms-root element to mount into. */
const root = document.createElement(HTML_TAGS.DIV)

root.id = CMS_IDS.CMS_ROOT
document.body.appendChild(root)

await import('@cms/main.js')

describe('cms main — null-user tails', () => {
  test('a signed-out auth callback mounts the login view', async () => {
    await Promise.resolve()
    await Promise.resolve()

    expect(root.firstElementChild?.tagName.toLowerCase()).toBe(CMS_TAGS.VIEW_ADMIN_LOGIN)
  })
})
